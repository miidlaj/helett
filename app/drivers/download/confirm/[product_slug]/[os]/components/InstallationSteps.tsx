import type React from "react";

interface InstallationStepsProps {
  os: string;
}

const InstallationSteps: React.FC<InstallationStepsProps> = ({ os }) => {
  const getSteps = () => {
    switch (os.toLowerCase()) {
      case "windows":
        return [
          "Locate the downloaded file in your Downloads folder",
          "Double-click the .exe file to start the installation",
          "Follow the on-screen instructions in the installation wizard",
          "Click 'Finish' when the installation is complete",
        ];
      case "mac":
        return [
          "Find the downloaded .dmg file in your Downloads folder",
          "Double-click the .dmg file to mount it",
          "Drag the driver application to the Applications folder",
          "Eject the mounted disk image",
        ];
      case "linux":
        return [
          "Open a terminal window",
          "Navigate to the directory containing the downloaded file",
          "Run the installation command (e.g., 'sudo dpkg -i driver-file.deb')",
          "Follow any additional on-screen instructions",
        ];
      default:
        return [
          "Locate the downloaded file",
          "Follow the installation instructions provided with the driver",
        ];
    }
  };

  return (
    <ol className="list-decimal pl-5 space-y-2">
      {getSteps().map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  );
};

export default InstallationSteps;
