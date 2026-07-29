import re
import logging
from typing import List, Dict, Any
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class CollectedArtifact(BaseModel):
    name: str
    artifact_type: str
    language: str
    content: str
    size_bytes: int

class ArtifactCollector:
    """
    Parses, validates, and extracts clean artifacts (Markdown, SQL, Python, OpenAPI, Dockerfile)
    from agent execution outputs.
    """
    
    def __init__(self):
        pass

    def extract_artifacts(self, task_id: str, role: str, raw_output: str) -> List[CollectedArtifact]:
        artifacts: List[CollectedArtifact] = []
        
        # Regex to find code blocks in markdown: ```language ... ```
        pattern = r"```(\w+)?\n(.*?)```"
        matches = re.findall(pattern, raw_output, re.DOTALL)

        if matches:
            for idx, (lang, code) in enumerate(matches):
                lang = lang.strip().lower() if lang else "txt"
                name = self._infer_name(role, lang, idx)
                art_type = self._infer_type(lang)
                artifacts.append(
                    CollectedArtifact(
                        name=name,
                        artifact_type=art_type,
                        language=lang,
                        content=code.strip(),
                        size_bytes=len(code.encode("utf-8")),
                    )
                )
        else:
            # Full text artifact
            name = f"{role.replace(' ', '_').lower()}_output.md"
            artifacts.append(
                CollectedArtifact(
                    name=name,
                    artifact_type="Documentation",
                    language="markdown",
                    content=raw_output.strip(),
                    size_bytes=len(raw_output.encode("utf-8")),
                )
            )

        logger.info(f"ArtifactCollector extracted {len(artifacts)} artifacts from task {task_id}")
        return artifacts

    def _infer_name(self, role: str, lang: str, idx: int) -> str:
        if lang == "python":
            return "main_router.py" if idx == 0 else f"module_{idx}.py"
        elif lang == "sql":
            return "migration.sql"
        elif lang == "yaml" or lang == "yml":
            return "openapi.yaml"
        elif lang == "dockerfile":
            return "Dockerfile"
        return f"{role.replace(' ', '_').lower()}_file_{idx}.{lang}"

    def _infer_type(self, lang: str) -> str:
        if lang in ["python", "typescript", "javascript"]:
            return "Source Code"
        elif lang == "sql":
            return "Database DDL"
        elif lang in ["yaml", "json"]:
            return "API Specification"
        elif lang == "dockerfile":
            return "DevOps Manifest"
        return "Documentation"
