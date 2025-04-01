"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCertificate } from "@/actions/certificate-actions";
import { FormEvent } from "react";

const CreateDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [marks, setMarks] = useState("");
  const [instructor, setInstructor] = useState("Rihaad");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const buttonDisabled = !name || !surname || !city || !marks;

  interface CertificateData {
    name: string;
    surname: string;
    city: string;
    marks: string;
    instructor: string;
    certificateType: string;
  }

  interface CreateCertificateResult {
    success: boolean;
    error?: string;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    // Validate marks as a number between 0-100
    const marksNum = parseFloat(marks);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      setError("Marks must be a number between 0 and 100");
      setIsPending(false);
      return;
    }

    const data: CertificateData = {
      name: name.trim(),
      surname: surname.trim(),
      city: city.trim(),
      marks: marks.trim(),
      instructor: instructor.trim(),
      certificateType: "Driver Risk Assessment",
    };

    try {
      const result: CreateCertificateResult = await createCertificate(data);

      if (result.success) {
        toast.success("Certificate created successfully", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });

        // Reset form
        setName("");
        setSurname("");
        setCity("");
        setMarks("");

        // Close dialog
        setOpen(false);

        // Refresh page to show new certificate
        router.refresh();
      } else {
        const errorMessage = result.error || "Failed to create certificate";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create New Certificate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Fill in the details for your new certificate
          </DialogTitle>
          <DialogDescription>
            This will be used to create a new certificate entry in the system.
            Please provide all the necessary information.
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          {/* name */}
          <div className="space-y-2">
            <Label htmlFor="name">Driver First Name*</Label>
            <Input
              id="name"
              type="text"
              placeholder="Miles"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
            />
          </div>

          {/* surname */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="surname" className="text-right">
              Driver Last Name*
            </Label>
            <Input
              id="surname"
              placeholder="White"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              disabled={isPending}
            />
          </div>

          {/* city */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="city" className="text-right">
              Driver City*
            </Label>
            <Input
              id="city"
              placeholder="Cape Town"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={isPending}
            />
          </div>

          {/* marks */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="marks" className="text-right">
              Marks Result in Percentage*
            </Label>
            <Input
              id="marks"
              placeholder="94"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              disabled={isPending}
              type="number"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          {/* instructor */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="instructor" className="text-right">
              Instructor
            </Label>
            <Input
              id="instructor"
              placeholder="Rihaad"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              disabled={isPending}
            />
          </div>

          {/* error message */}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

          {/* submit button */}
          <Button
            type="submit"
            size="lg"
            disabled={isPending || buttonDisabled}
            className="min-w-[150px]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Creating Certificate...</span>
              </span>
            ) : (
              "Create Certificate"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
