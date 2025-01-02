from pydantic import BaseModel
from typing import List


class StepRequest(BaseModel):
    """
    Represents the parameters needed to create a new step
    """

    step_number: int
    step: str


class StepResponse(BaseModel):
    """
    Represents a step
    """

    id: int
    step_number: int
    step: str
    recipe_id: int

    class Config:
        from_attributes = True


class StepList(BaseModel):
    """
    Represents a list of steps
    """

    steps: List[StepResponse]
