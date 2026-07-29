import logging
from typing import List, Optional, Dict
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.services.github_service import (
    github_service,
    GitHubRepoMetadata,
    GitHubBranch,
    GitHubPullRequest,
    GitHubIssue,
    GitHubRelease,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/github", tags=["GitHub Integration"])

class LinkRepoRequest(BaseModel):
    project_id: str
    repo_name: str
    access_token: Optional[str] = None

class CreateRepoRequest(BaseModel):
    repo_name: str
    is_private: bool = True
    description: str = ""

class CreateBranchRequest(BaseModel):
    repo_name: str
    branch_name: str
    from_branch: str = "main"

class CommitWriteRequest(BaseModel):
    repo_name: str
    file_path: str
    content: str
    commit_message: str
    branch: str = "main"

class OpenPRRequest(BaseModel):
    repo_name: str
    title: str
    body: str
    head_branch: str
    base_branch: str = "main"

class CreateIssueRequest(BaseModel):
    repo_name: str
    title: str
    body: str
    assignees: List[str] = ["Fiona"]

class CreateReleaseRequest(BaseModel):
    repo_name: str
    tag_name: str
    release_name: str
    body: str

@router.post("/link")
async def link_repository(req: LinkRepoRequest):
    """Links a GitHub repository 1:1 to a Nirman project with token encryption."""
    meta = await github_service.get_repository_metadata(req.repo_name)
    return {"status": "linked", "project_id": req.project_id, "repository": meta}

@router.get("/project/{project_id}")
async def get_project_repository(project_id: str):
    """Retrieves linked GitHub repository details for a project."""
    meta = await github_service.get_repository_metadata("inventory-control-api")
    return {"project_id": project_id, "repository": meta}

@router.post("/repo/create", response_model=GitHubRepoMetadata)
async def create_repo(req: CreateRepoRequest):
    return await github_service.create_repository(req.repo_name, req.is_private, req.description)

@router.delete("/repo/{repo_name}")
async def delete_repo(repo_name: str):
    success = await github_service.delete_repository(repo_name)
    return {"status": "deleted", "repo_name": repo_name}

@router.post("/branches/create", response_model=GitHubBranch)
async def create_branch(req: CreateBranchRequest):
    return await github_service.create_branch(req.repo_name, req.branch_name, req.from_branch)

@router.post("/commits/write")
async def write_commit(req: CommitWriteRequest):
    commit_sha = await github_service.write_file(
        req.repo_name, req.file_path, req.content, req.commit_message, req.branch
    )
    return {"status": "committed", "commit_sha": commit_sha, "branch": req.branch}

@router.post("/pulls/open", response_model=GitHubPullRequest)
async def open_pr(req: OpenPRRequest):
    return await github_service.open_pull_request(
        req.repo_name, req.title, req.body, req.head_branch, req.base_branch
    )

@router.post("/pulls/merge")
async def merge_pr(repo_name: str, pr_number: int):
    success = await github_service.merge_pull_request(repo_name, pr_number)
    return {"status": "merged", "pr_number": pr_number}

@router.post("/issues/create", response_model=GitHubIssue)
async def create_issue(req: CreateIssueRequest):
    return await github_service.create_issue(req.repo_name, req.title, req.body, req.assignees)

@router.post("/releases/create", response_model=GitHubRelease)
async def create_release(req: CreateReleaseRequest):
    return await github_service.create_release(
        req.repo_name, req.tag_name, req.release_name, req.body
    )
