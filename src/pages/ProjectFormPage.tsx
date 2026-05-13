import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { createUniqueSlug } from "../utils/slug";
import { useProjectStore } from "../stores/projectStore";

const projectSchema = z.object({
  companyName: z.string().min(2, "Informe a empresa"),
  projectName: z.string().min(2, "Informe o nome da obra"),
  clientName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  currency: z.enum(["BRL", "EUR"]),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const smartPresets = [
  { label: "Gyproc padrao", spacing: "0.48", detail: "Forro comum, F47 standard" },
  { label: "Corredor", spacing: "0.48", detail: "Preparado para formulas reforcadas" },
  { label: "Bombeiros", spacing: "0.40", detail: "Baseado no Excel original" },
];

export function ProjectFormPage() {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const createProject = useProjectStore((state) => state.createProject);
  const existingSlugs = projects.map((project) => project.slug).filter(Boolean);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      companyName: "JK Gyproc Art",
      projectName: "",
      clientName: "",
      address: "",
      city: "",
      currency: "BRL",
    },
  });

  const watchedName = watch("projectName");
  const slug = useMemo(() => createUniqueSlug(watchedName, existingSlugs), [existingSlugs, watchedName]);

  function onSubmit(values: ProjectFormValues) {
    createProject(values);
    navigate("/workspace");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
          <Sparkles size={14} />
          Formulario inteligente
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Novo projeto</h1>
        <p className="mt-1 text-sm text-slate-400">
          Cria o projeto, gera um slug unico e prepara a base para zonas, materiais e orcamento.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-slate-200">Nome da obra</span>
              <input className="field w-full" placeholder="Ex: Comfort Tag Flat" {...register("projectName")} />
              {errors.projectName ? <span className="text-xs text-red-300">{errors.projectName.message}</span> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Empresa</span>
              <input className="field w-full" {...register("companyName")} />
              {errors.companyName ? <span className="text-xs text-red-300">{errors.companyName.message}</span> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Cliente</span>
              <input className="field w-full" placeholder="Nome do cliente" {...register("clientName")} />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Cidade</span>
              <input className="field w-full" placeholder="Ex: Bruxelles" {...register("city")} />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Moeda</span>
              <select className="field w-full" {...register("currency")}>
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
              </select>
            </label>

            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-slate-200">Endereco</span>
              <input className="field w-full" placeholder="Rua, numero, complemento" {...register("address")} />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60 sm:w-auto"
          >
            Criar projeto
            <ArrowRight size={16} />
          </button>
        </section>

        <aside className="space-y-3">
          <section className="rounded-lg border border-white/10 bg-slate-900 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Slug</p>
            <p className="mt-2 break-all rounded-lg bg-slate-950 px-3 py-2 font-mono text-sm text-amber-300">{slug}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">Usado para URLs, exportacoes e referencias estaveis.</p>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-semibold text-white">Presets sugeridos</p>
            <div className="mt-3 space-y-2">
              {smartPresets.map((preset) => (
                <div key={preset.label} className="rounded-lg bg-slate-900 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">{preset.label}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                      <Check size={13} />
                      {preset.spacing}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{preset.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}
