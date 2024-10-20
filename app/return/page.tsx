"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import dynamic from "next/dynamic";

const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false },
);

const Return = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleScan = (err: any, result: any) => {
    if (result) {
      setIsScanning(false);
      setScanSuccess(true);
      console.log(result.text);
    }
  };

  return (
    <>
      <NavBar isLoggedIn={true} />

      {/* Return */}
      <div className="container mx-auto p-6">
        <Card className="mx-auto max-w-md p-6">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Return a Container
          </h2>
          <div className="mb-4 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsScanning(!isScanning);
                setScanSuccess(false);
              }}
            >
              {isScanning ? "Stop Scanning" : "Scan Container"}
            </Button>
          </div>

          {/* Barcode Scanner */}
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
        </Card>
      </div>
    </>
  );
};

export default Return;
