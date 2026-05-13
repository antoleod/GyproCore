import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Calculator, MapPin, Settings, RotateCcw, Lightbulb } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useProjectStore } from "../stores/projectStore";
import { useLastMeasurement } from "../hooks/useLastMeasurement";
import { createUniqueSlug } from "../utils/slug";
import { suggestProjectName, getExistingProjectNames } from "../utils/nameSuggestion";
import { InlineEditField } from "../components/ui/InlineEditField";
import { CollapsibleSection } from "../components/ui/CollapsibleSection";
import { AddAnotherRoomModal } from "../components/ui/AddAnotherRoomModal";

const calculationSchema = z.object({
  locationName: z.string().min(2, "Informe o nome da localizacao"),
  spacing: z.coerce.number().positive("Espacamento deve ser maior que zero"),
  coefficientPercent: z.coerce.number().min(0, "Coeficiente nao pode ser negativo"),
  floorQuantity: z.coerce.number().positive("Qtd. Pav. deve ser maior que zero"),
  unitQuantity: z.coerce.number().positive("Qtd. Und. deve ser maior que zero"),
  localName: z.string().min(1, "Informe o nome do local"),
  side1: z.coerce.number().positive("Lado 1 deve ser maior que zero"),
  side2: z.coerce.number().positive("Lado 2 deve ser maior que zero"),
});

type CalculationFormInput = z.input<typeof calculationSchema>;
type CalculationFormValues = z.output<typeof calculationSchema>;

export function ProjectFormPage() {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const createCalculation = useProjectStore((state) => state.createCalculation);
  const existingSlugs = projects.map((project) => project.slug).filter(Boolean);
  const { lastMeasurement, saveLastMeasurement } = useLastMeasurement();

  const [params, setParams] = useState({
    spacing: 0.4,
    coefficientPercent: 5,
    floorQuantity: 1,
    unitQuantity: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [tempProjectData, setTempProjectData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CalculationFormInput, unknown, CalculationFormValues>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      locationName: "",
      spacing: params.spacing,
      coefficientPercent: params.coefficientPercent,
      floorQuantity: params.floorQuantity,
      unitQuantity: params.unitQuantity,
      localName: lastMeasurement?.localName ?? "",
      side1: lastMeasurement?.side1 ?? 0,
      side2: lastMeasurement?.side2 ?? 0,
    },
  });

  const locationName = watch("locationName");
  const slug = useMemo(() => createUniqueSlug(locationName, existingSlugs), [existingSlugs, locationName]);

  const existingProjectNames = useMemo(() => getExistingProjectNames(projects), [projects]);
  const suggestedName = useMemo(
    () => suggestProjectName(locationName, existingProjectNames),
    [locationName, existingProjectNames]
  );

  function onSubmit(values: CalculationFormValues) {
    // Save last measurement
    saveLastMeasurement({
      localName: values.localName,
      side1: values.side1,
      side2: values.side2,
    });

    const projectData = {
      companyName: "JK Gyproc Art",
      projectName: values.locationName,
      clientName: "",
      address: "",
      city: "",
      currency: "BRL",
      locationName: values.locationName,
      spacing: params.spacing,
      coefficient: params.coefficientPercent / 100,
      floorQuantity: params.floorQuantity,
      unitQuantity: params.unitQuantity,
      localName: values.localName,
      side1: values.side1,
      side2: values.side2,
    };

    setTempProjectData(projectData);
    setShowModal(true);
  }

  function createProjectAndNavigate() {
    if (tempProjectData) {
      createCalculation(tempProjectData);
      navigate("/workspace");
    }
  }

  function createProjectAndAddAnother() {
    if (tempProjectData) {
      createCalculation(tempProjectData);
      setShowModal(false);
      // Reset form
      setParams({
        spacing: 0.4,
        coefficientPercent: 5,
        floorQuantity: 1,
        unitQuantity: 1,
      });
      // Clear form fields
      const form = document.querySelector("form") as HTMLFormElement;
      if (form) form.reset();
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
          <Calculator size={14} />
          Novo Cálculo
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Bem-vindo ao GyproCore</h1>
        <p className="mt-2 text-slate-400">
          Vamos começar definindo o local de trabalho. Você pode ajustar os parâmetros depois se necessário.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: Localização */}
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-slate-950">
              1
            </span>
            <h2 className="text-lg font-semibold text-white">Onde você está trabalhando?</h2>
          </div>

          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Nome do local</span>
              <input
                className="field w-full"
                placeholder="Ex: Corpo de bombeiros, Comfort Tag Flat..."
                {...register("locationName")}
              />
              {errors.locationName && (
                <span className="text-xs text-red-300">{errors.locationName.message}</span>
              )}
            </label>

            {suggestedName && (
              <div className="rounded-lg bg-blue-400/5 border border-blue-400/20 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb size={14} className="text-blue-300" />
                  <p className="text-xs font-medium text-blue-300">Nome já existe</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-300">
                    Sugerimos: <span className="font-semibold text-blue-300">{suggestedName}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const form = document.querySelector("form") as HTMLFormElement;
                      const input = form?.querySelector('input[name="locationName"]') as HTMLInputElement;
                      if (input) {
                        input.value = suggestedName;
                        input.dispatchEvent(new Event("change", { bubbles: true }));
                      }
                    }}
                    className="text-xs font-semibold text-blue-300 hover:text-blue-200 transition px-2 py-1 rounded hover:bg-blue-400/10"
                  >
                    Usar
                  </button>
                </div>
              </div>
            )}

            {locationName && !suggestedName && (
              <div className="rounded-lg bg-amber-400/5 border border-amber-400/20 p-3">
                <p className="text-xs uppercase text-slate-400 mb-1">Identificador único</p>
                <p className="font-mono text-sm text-amber-300">{slug}</p>
              </div>
            )}
          </div>
        </section>

        {/* Step 2: Primeiro local */}
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-slate-950">
                2
              </span>
              <h2 className="text-lg font-semibold text-white">Primeira medida</h2>
            </div>
            {lastMeasurement && (
              <button
                type="button"
                onClick={() => {
                  setValue("localName", "");
                  setValue("side1", 0);
                  setValue("side2", 0);
                }}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition"
                title="Limpar últimos valores"
              >
                <RotateCcw size={14} />
                Limpar
              </button>
            )}
          </div>

          <p className="mb-4 text-sm text-slate-400">
            Adicione o nome do primeiro cômodo e suas dimensões (comprimento e largura).
            {lastMeasurement && (
              <span className="block mt-2 text-xs text-emerald-300">
                ✓ Usando últimas medidas: {lastMeasurement.localName} ({lastMeasurement.side1}m × {lastMeasurement.side2}m)
              </span>
            )}
          </p>

          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Nome do cômodo</span>
              <input
                className="field w-full"
                placeholder="Ex: Sala, Corredor, Quarto..."
                {...register("localName")}
              />
              {errors.localName && (
                <span className="text-xs text-red-300">{errors.localName.message}</span>
              )}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">Comprimento (m)</span>
                <input
                  className="field w-full"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("side1")}
                />
                {errors.side1 && (
                  <span className="text-xs text-red-300">{errors.side1.message}</span>
                )}
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">Largura (m)</span>
                <input
                  className="field w-full"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("side2")}
                />
                {errors.side2 && (
                  <span className="text-xs text-red-300">{errors.side2.message}</span>
                )}
              </label>
            </div>
          </div>
        </section>

        {/* Step 3: Parâmetros (Colapsível) */}
        <CollapsibleSection
          title="Parâmetros do Projeto"
          icon={<Settings size={17} />}
          variant="amber"
          defaultOpen={false}
        >
          <p className="mb-4 text-xs text-slate-400">
            Estes valores vêm do seu levantamento. Clique em qualquer número para editar.
          </p>
          <div className="grid gap-3 sm:grid-cols-4">
            <InlineEditField
              label="Espçto (m)"
              value={params.spacing}
              onChange={(val) => setParams({ ...params, spacing: val as number })}
              type="number"
              step="0.01"
            />
            <InlineEditField
              label="Coef. %"
              value={params.coefficientPercent}
              onChange={(val) => setParams({ ...params, coefficientPercent: val as number })}
              type="number"
              step="0.01"
            />
            <InlineEditField
              label="Qtd. Pav."
              value={params.floorQuantity}
              onChange={(val) => setParams({ ...params, floorQuantity: val as number })}
              type="number"
              step="1"
            />
            <InlineEditField
              label="Qtd. Und."
              value={params.unitQuantity}
              onChange={(val) => setParams({ ...params, unitQuantity: val as number })}
              type="number"
              step="1"
            />
          </div>
        </CollapsibleSection>

        {/* CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60 sm:w-auto"
        >
          Começar Cálculo
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Modal */}
      <AddAnotherRoomModal
        isOpen={showModal}
        onAddAnother={createProjectAndAddAnother}
        onFinish={createProjectAndNavigate}
      />
    </div>
  );
}
