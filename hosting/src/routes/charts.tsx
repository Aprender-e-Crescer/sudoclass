import { firestore } from '@/services/firebase';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { addDoc, collection, endAt, getDocs } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { z } from 'zod';
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ChartConfig } from "@/components/ui/chart"
import { SectorChart } from '@/components/custom/sector-chart';

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "#D9D9D9",
    },
  } satisfies ChartConfig


export const Route = createFileRoute('/charts')({
  component: Charts,
})

export const chartsSchema = z.object({
    data: z.array(z.object({
      browser: z.string(),
      visitors: z.number().min(0).max(100),
      fill: z.string(),
    })),
    descriptionChart: z.string(),
    endAngle: z.number(),
    innerRadius: z.number(),
    outerRadius: z.number(),
    polarRadius: z.array(z.number()),
    valueSize: z.string(),
  });

  export type Charts = z.infer<typeof chartsSchema>

  export function useChartsQuery() {
    return useQuery({
      queryKey: ['getCharts'],
      queryFn: async () => {
        const chartsRef = collection(firestore, 'charts').withConverter({
          toFirestore: (charts: Charts) => charts,
          fromFirestore: (snapshot) => chartsSchema.parse(snapshot.data()),
        })
        const snapshot = await getDocs(chartsRef)
        return snapshot.docs.map((doc) => doc.data())
      },
    })
  }

  export function useChartsMutation() {
    return useMutation({
      mutationKey: ['addCharts'],
      mutationFn: async (values: Charts) => {
        return addDoc(collection(firestore, "charts"), values);
      },
    });
  }


function Charts() {
    const { data: chartDocs, isLoading, error } = useChartsQuery()
    const { mutate: addDataSet } = useChartsMutation()

    if (isLoading) {
      return (
        <div>
          <h1>Carregando...</h1>
        </div>
      )
    }
  
    if (error) return <h1>Erro ao carregar os dados: {error.message}</h1>

    const searchSubmitForm = async (values: Charts, resetForm: () => void) => {
            addDataSet(values)
          resetForm();
      };
    
    return (
        <div>
        <div className="flex flex-wrap justify-center">
        {chartDocs?.map(({ data, descriptionChart, endAngle, innerRadius, outerRadius, polarRadius, valueSize }, index) => (
        <div key={index} className="flex-1 max-w-xs">
           <SectorChart chartData={data} chartConfig={chartConfig} descriptionChart={descriptionChart} endAngle={endAngle} polarRadius={polarRadius} innerRadius={innerRadius} outerRadius={outerRadius} valueSize={valueSize} />
        </div>
       ))}
       </div>

       <div>
          <Formik
            initialValues={{
              data: [{ browser: "", visitors: 0, fill: "" }],
              descriptionChart: "",
              endAngle: 0,
              innerRadius: 0,
              outerRadius: 0,
              polarRadius: [0, 0],
              valueSize: "",
            }}
            validationSchema={toFormikValidationSchema(chartsSchema)}
            onSubmit={(values, { resetForm }) => searchSubmitForm(values, resetForm)}
          >
          </Formik>
        </div>
       </div>
    )
}
