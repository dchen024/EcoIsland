"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false },
);

const ActivatePage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleScan = async (err: any, result: any) => {
    if (result) {
      setIsScanning(false);
      setScanSuccess(true);
      const scannedUUID = result.text;
      console.log("Scanned UUID:", scannedUUID);

      try {
        const response = await fetch(`/api/activateContainer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            container_id: scannedUUID,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Unknown error occurred");
          console.error("Error in response:", errorData.message);
          return;
        }

        const data = await response.json();
        console.log("Container activated successfully:", data.message);

        router.push("/admin");
      } catch (error) {
        setErrorMessage("An unexpected error occurred.");
        console.error("Error in handleScan:", error);
      }
    }
  };

  return (
    <>
      <NavBar isLoggedIn={true} />

      <div className="container mx-auto p-6">
        <Card className="mx-auto max-w-md p-6">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Activate a Container
          </h2>

          <div className="mb-4 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsScanning(!isScanning);
                setScanSuccess(false);
                setErrorMessage("");
                console.log("Started scanning...");
              }}
            >
              {isScanning ? "Stop Scanning" : "Scan Container"}
            </Button>
          </div>

          {isScanning && (
            <div className="mb-4">
              <BarcodeScannerComponent
                width={"100%"}
                height={250}
                onUpdate={handleScan}
              />
            </div>
          )}

          {scanSuccess && (
            <div className="mb-4 text-center font-semibold text-green-500">
              Scan successful!
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 text-center font-semibold text-red-500">
              {errorMessage}
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default ActivatePage;
