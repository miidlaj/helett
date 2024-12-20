export default function ProgressBar({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {index + 1}
          </div>
          <div
            className={`ml-2 ${
              index + 1 <= currentStep
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-px w-16 mx-2 ${
                index + 1 < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
