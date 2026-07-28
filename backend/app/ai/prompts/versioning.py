from typing import Dict, List, Optional

class PromptVersioning:
    def __init__(self):
        """
        Manages version histories and updates for prompt templates.
        """
        # Dict mapping template_key -> list of version dicts [ {version: 1, content: "..."}, ... ]
        self.registry: Dict[str, List[Dict[str, Any]]] = {}

    def register_template(self, key: str, content: str) -> int:
        """
        Registers a new template content. Automatically increments the version index.
        """
        if key not in self.registry:
            self.registry[key] = []

        history = self.registry[key]
        next_ver = len(history) + 1
        history.append({
            "version": next_ver,
            "content": content
        })
        return next_ver

    def get_template(self, key: str, version: Optional[int] = None) -> Optional[str]:
        """
        Retrieves a template by key and optional version index. Defaults to latest version.
        """
        history = self.registry.get(key)
        if not history:
            return None

        if version is None:
            return history[-1]["content"]

        for item in history:
            if item["version"] == version:
                return item["content"]
        return None

    def rollback(self, key: str, target_version: int) -> bool:
        """
        Reverts the active version back to the specified past version.
        """
        history = self.registry.get(key)
        if not history:
            return False

        target_content = None
        for item in history:
            if item["version"] == target_version:
                target_content = item["content"]
                break

        if not target_content:
            return False

        # Add target content as the newest active version
        self.register_template(key, target_content)
        return True
