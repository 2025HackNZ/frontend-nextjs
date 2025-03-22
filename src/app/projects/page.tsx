"use client"
import * as React from "react"
import { ProjectCard } from "@/components/ProjectCard/ProjectCard"
import { projects as projectsData } from "@/app/constants/projectData"
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi"
import { daoABI, daoContractAddress, nzddDigits } from "../../utils/utils"
import { useEffect, useState } from "react"
import { formatUnits } from "viem"

export default function Projects() {
  const { address, isConnected} = useAccount()
  const { writeContract, isSuccess } = useWriteContract()
  const [isMember, setIsMember] = useState(false)
  const [projects, setProjects] = useState(
    projectsData.map(project => ({
      ...project,
      votes: project.funding?.current || 0,
      voted: false
    }))
  )

  // Get member info
  const { data: memberInfo, refetch: refetchMemberInfo } = useReadContract({
    abi: daoABI,
    address: daoContractAddress as `0x${string}`,
    functionName: "getMemberInfo",
    args: [address as `0x${string}`]
  }) as any;

  const { data: deposits, refetch: refetchDeposits } = useReadContract({
    abi: daoABI,
    address: daoContractAddress as `0x${string}`,
    functionName: "totalDeposits",
  }) as any;

  const {
    data: proposalsData,
    refetch: refetchProposals
  } = useReadContracts({
    contracts: projectsData.map((project) => ({
      address: daoContractAddress as `0x${string}`,
      abi: daoABI,
      functionName: 'getProposal',
      args: [BigInt(project.id)],
    })),
  } as any)
    console.log("🚀 ~ Projects ~ proposalsData:", proposalsData)

  const handleVote = (projectId: number | string) => {
    writeContract({
      abi: daoABI,
      address: daoContractAddress,
      functionName: 'vote',
      args: [projectId],
    })
  }

  const sqrt = (totatDeposits: number) => {
    if (totatDeposits === 0) return 0;

    let z = (totatDeposits + 1) / 2;
    let y = totatDeposits;

    while (z < y) {
        y = z;
        z = (totatDeposits / z + z) / 2;
    }

    return y;
  }
  console.log("🚀 ~ updatedProjects ~ deposits:", deposits)

  useEffect(() => {
    if (proposalsData && proposalsData.length > 0) {
      const updatedProjects = projectsData.map((project, index) => {
        const proposalResult = proposalsData[index];

        if (!proposalResult?.result) {
          return project;
        }

        const proposalData = proposalResult.result as any[];

        // Calculate current funding based on blockchain data
        // Assuming amount represents total funding needed and votes are the progress towards it
        // Get raw values from the contract (as BigInt)
        const yesVotesBigInt = proposalData[1];
        const amountBigInt = proposalData[4];
        const totalDepositsBigInt = deposits;

        // Convert to numbers - use Number() for direct conversion if values aren't too large
        // or use formatUnits with the correct number of decimals
        const yesVotes = Number(yesVotesBigInt); // Or use formatUnits if needed
        const amount = Number(formatUnits(amountBigInt, nzddDigits));
        const totalDepositsNum = Number(totalDepositsBigInt); // Or use formatUnits if needed

        console.log("Yes Votes:", yesVotes);
        console.log("Total Deposits:", totalDepositsNum);
        
        // Calculate total voting power using the square root function
        const totalVotingPower = sqrt(totalDepositsNum);
        console.log("Total Voting Power:", totalVotingPower);
        
        // Calculate current percentage of voting power
        const currentPercentage = (yesVotes / totalVotingPower) * 100;
        console.log("Current Percentage:", currentPercentage);
        
        // Calculate the progress (capped at 100%)
        const progress = Math.min(Math.round(currentPercentage), 100);
        console.log("Progress:", progress);
        
        console.log("🚀 ~ updatedProjects ~ progress:", progress)

        return {
          ...project,
          progress: progress,
          votes: yesVotes,
          // Keep the existing voted status to maintain UI state between refreshes
          voted: project.voted || false,
          // funding: {
          //   ...project.funding,
          //   current: currentFunding
          // },
          proposalData: {
            description: proposalData[0],
            yesVotes: yesVotes,
            endTime: new Date(Number(proposalData[2]) * 1000),
            executed: proposalData[3],
            amount: amount,
            target: proposalData[5]
          },
          executed: proposalData[3],
        };
      });

      setProjects((prevProjects: any) =>
        updatedProjects.map((newProject, index) => ({
          ...newProject,
          votes: newProject.votes || 0, // Ensure votes property is always present
          voted: prevProjects[index]?.voted || newProject.voted
        }))
      );
    }
  }, [proposalsData]);

  useEffect(() => {
    if(memberInfo) {
      const depositAmount = Number(formatUnits(memberInfo[0], nzddDigits));
      setIsMember(depositAmount > 0);
    }
  }, [memberInfo])

  useEffect(() => {
    if (isSuccess) {
      refetchMemberInfo()
      refetchDeposits()
      refetchProposals()
    }
  }, [isSuccess])

  return (
    <div className="container mx-auto py-32 px-4 sm:px-6"> {/* Added horizontal padding */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Total Contributions: ${isConnected && deposits && formatUnits(deposits, nzddDigits)}</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {!isConnected ? (
          <>Connect Wallet First</>
        ) : (
          <>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isMember={isMember}
                onVote={() => handleVote(project.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
