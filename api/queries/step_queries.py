from schema.steps import StepRequest, StepResponse
from db.models import Step, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete, update


class StepQueries:
    def create_step(
        self, step_in: StepRequest, recipe_id: int
    ) -> StepResponse:
        with Session(engine) as session:
            step = Step(
                step_number=step_in.step_number,
                name=step_in.name,
                recipe_id=recipe_id,
            )
            session.add(step)
            session.commit()
            if not step:
                return None

            return StepResponse.model_validate(step)

    def update_step(
        self, step_in: StepRequest, recipe_id: int, step_id: int
    ) -> bool:
        with Session(engine) as session:
            stmt = (
                update(Step)
                .where(Step.id == step_id, Step.recipe_id == recipe_id)
                .values(name=step_in.name, step_number=step_in.step_number)
            )
            result = session.execute(stmt)
            session.commit()
            return result.rowcount > 0

    def delete_step(self, recipe_id: int, step_id: int) -> bool:
        with Session(engine) as session:
            stmt = delete(Step).where(
                Step.id == step_id, Step.recipe_id == recipe_id
            )

            result = session.execute(stmt)
            session.commit()
            return result.rowcount > 0
