interface RecommendedStepsProps {
  title: string;
  steps: string[];
}

export const RecommendedSteps = ({ title, steps }: RecommendedStepsProps) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">{title}</h3>
      <ol className="flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-accent text-[11px] font-semibold text-success-accent-foreground">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecommendedSteps;
