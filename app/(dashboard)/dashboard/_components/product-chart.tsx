'use client'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

type Tdata = {
  week: string
  products: number
}

export default function ProductChart({ data }: { data: Tdata[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="week"
          stroke="#555"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <XAxis
          stroke="#666"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Area
          type={'monotone'}
          dataKey={'products'}
          stroke="#0046FF"
          fill="#0046FF"
          strokeWidth={2}
          dot={{ fill: '#0046FF', r: 2 }}
          activeDot={{ fill: '#0046FF', r: 4 }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e73b',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          }}
          labelStyle={{
            color: '#374151',
            fontWeight: '500',
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
