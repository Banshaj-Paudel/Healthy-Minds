import { Router } from "express";
import { getB64Bytes } from "../utils/blockchainFile";
import { hasAuthenticated } from "../middlewares/hasAuthenticated";
import { prisma } from "../prisma";
import { getDiagnosticData } from "../utils/mlResponse";

export const patientRouter = Router();

interface CreatePatientDto {
  name: string;
  image: string;
  phoneNumber: string;
}

interface UpdateDiagnosticDto {
  risk: string;
  message: string;
}

patientRouter.post("/", async function (req, res) {
  const newPatient = req.body as CreatePatientDto;
  const bytes = await getB64Bytes(newPatient.image);
  const diagData = await getDiagnosticData(bytes);

  const { id: patientId } = await prisma.patient.create({
    data: {
      ...newPatient,
      diagnostics: {
        create: {
          ...diagData,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return res.json({ patientId });
});

patientRouter.patch(
  "/diagnostics/:diagnosticId(d+)",
  hasAuthenticated,
  async function (req, res) {
    const { diagnosticId } = req.params;
    const diagnosticData = req.body as UpdateDiagnosticDto;

    await prisma.diagnostic.update({
      where: { id: +diagnosticId },
      data: { verified: true, ...diagnosticData },
    });
    return res.status(200);
  }
);

patientRouter.get("/:patientId(d+)/diagnostics/", async function (req, res) {
  const { patientId } = req.params;
  const diagnostics = await prisma.patient.findUnique({
    where: { id: +patientId },
    select: { diagnostics: true },
  });
  return res.json(diagnostics);
});

patientRouter.get("/:patientId(d+)", async function (req, res) {
  const { patientId } = req.params;
  const patientData = await prisma.patient.findUnique({
    where: { id: +patientId },
  });
  return res.json(patientData);
});
