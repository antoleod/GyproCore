import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Calculator, MapPin, Ruler } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useProjectStore } from "../stores/projectStore";
import { createUniqueSlug } from "../utils/slug";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CalculationFormInput, unknown, CalculationFormValues>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      locationName: "",
      spacing: 0.4,
      coefficientPercent: 5,
      floorQuantity: 1,
      unitQuantity: 1,
      localName: "",
      side1: 0,
      side2: 0,
    },
  });

  const locationName = watch("locationName");
  const slug = useMemo(() => createUniqueSlug(locationName, existingSlugs), [existingSlugs, locationName]);

  function onSubmit(values: CalculationFormValues) {
    createCalculation({
      companyName: "JK Gyproc Art",
      projectName: values.locationName,
      clientName: "",
      address: "",
      city: "",
      currency: "BRL",
      locationName: values.locationName,
      spacing: values.spacing,
      coefficient: values.coefficientPercent / 100,
      floorQuantity: values.floorQuantity,
      unitQuantity: values.unitQuantity,
      localName: values.localName,
      side1: values.side1,
      side2: values.side2,
    });
    navigate("/workspace");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
          <Calculator size={14} />
          Novo calculo
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Comecar pelo local</h1>
        <p className="mt-1 text-sm text-slate-400">
          Fluxo baseado no Excel: primeiro `B4`, depois parametros internos editaveis e a primeira linha de medidas.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin size={17} className="text-amber-400" />
            Localizacao
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_220px]">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Nome da localizacao B4</span>
              <input className="field w-full" placeholder="Ex: Corpo de bombeiros" {...register("locationName")} />
              {errors.locationName ? <span className="text-xs text-red-300">{errors.locationName.message}</span> : null}
            </label>
            <div className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Slug</span>
              <p className="min-h-10 break-all rounded-lg border border-white/10 bg-slate-950 px-3 py-2 font-mono text-sm text-amber-300">
                {slug}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Ruler size={17} className="text-amber-400" />
            Parametros do Excel
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Espçto</span>
              <input className="field w-full" type="number" step="0.01" {...register("spacing")} />
              {errors.spacing ? <span className="text-xs text-red-300">{errors.spacing.message}</span> : null}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Coef. %</span>
              <input className="field w-full" type="number" step="0.01" {...register("coefficientPercent")} />
              {errors.coefficientPercent ? <span className="text-xs text-red-300">{errors.coefficientPercent.message}</span> : null}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Qtd. Pav.</span>
              <input className="field w-full" type="number" step="1" {...register("floorQuantity")} />
              {errors.floorQuantity ? <span className="text-xs text-red-300">{errors.floorQuantity.message}</span> : null}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Qtd. Und.</span>
              <input className="field w-full" type="number" step="1" {...register("unitQuantity")} />
              {errors.unitQuantity ? <span className="text-xs text-red-300">{errors.unitQuantity.message}</span> : null}
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-semibold text-white">Primeiro local</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_160px_160px]">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Nome do local</span>
              <input className="field w-full" placeholder="Ex: Sala, corredor, quarto" {...register("localName")} />
              {errors.localName ? <span className="text-xs text-red-300">{errors.localName.message}</span> : null}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Lado 1</span>
              <input className="field w-full" type="number" step="0.01" {...register("side1")} />
              {errors.side1 ? <span className="text-xs text-red-300">{errors.side1.message}</span> : null}
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Lado 2</span>
              <input className="field w-full" type="number" step="0.01" {...register("side2")} />
              {errors.side2 ? <span className="text-xs text-red-300">{errors.side2.message}</span> : null}
            </label>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60 sm:w-auto"
        >
          Criar calculo
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
