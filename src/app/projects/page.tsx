"use client"
import * as React from "react"
import { ProjectCard } from "@/components/ProjectCard/ProjectCard"
import { projects as projectsData } from "@/app/constants/projectData"
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi"
import { abi, contractAddress } from "../../utils/utils"
import { useEffect, useState } from "react"
import { formatEther, parseEther } from "viem"

export default function Projects() {
  const account = useAccount()
  const { writeContract, isPending, isSuccess, isError: isWriteError } = useWriteContract()
  const [isMember, setIsMember] = useState(false)
  const [contributions, setContributions] = useState(0)
  const [projects, setProjects] = useState(
    projectsData.map(project => ({
      ...project,
      votes: project.funding?.current || 0,
      voted: false
    }))
  )

  // Get member info
  const { data: memberInfo, error: memberError, refetch: refetchMemberInfo } = useReadContract({
    abi: abi,
    address: contractAddress as `0x${string}`,
    functionName: "getMemberInfo",
    args: [account.address as `0x${string}`]
  }) as any;

  const { data: deposits, refetch: refetchDeposits } = useReadContract({
    abi: abi,
    address: contractAddress as `0x${string}`,
    functionName: "totalDeposits",
  }) as any;
  console.log("🚀 ~ Projects ~ deposits:", deposits)

  const { 
    data: proposalsData, 
    isError: isProposalsError, 
    isLoading: isProposalsLoading,
    refetch: refetchProposals
  } = useReadContracts({
    contracts: projectsData.map((project) => ({
      address: contractAddress as `0x${string}`,
      abi,
      functionName: 'proposals',
      args: [BigInt(project.id)],
    })),
  } as any)

  const handleVote = (projectId: number | string) => {
    writeContract({
      abi: abi,
      address: contractAddress,
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
        const yesVotes = Number(proposalData[1]);
        const amount = Number(formatEther(proposalData[4]));

        const totalVotingPower = sqrt(Number(formatEther(deposits)));
        
        // Calculate current percentage of voting power
        // In the contract, a proposal needs 51% to pass
        const currentPercentage = (yesVotes / totalVotingPower) * 100;
        const progress = Math.min(Math.round(currentPercentage), 100);
        
        // Calculate threshold needed to pass
        const threshold = totalVotingPower * 0.51;
        
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
          }
        };
      });
      
      setProjects((prevProjects: any) => 
        updatedProjects.map((newProject, index) => ({
          ...newProject,
        }))
      );
    }
  }, [proposalsData]);

  useEffect(() => {
    if(memberInfo) {
      const depositAmount = Number(formatEther(memberInfo[0]));
      setContributions(depositAmount);
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
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isMember={isMember}
            onVote={() => handleVote(project.id)}
          />
        ))}
      </div>
    </div>
  )
}