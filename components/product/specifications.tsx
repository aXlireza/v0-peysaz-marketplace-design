import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Specification {
  label: string
  labelFA?: string
  value: string
}

interface SpecificationsProps {
  specs: Specification[]
}

export function Specifications({ specs }: SpecificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border">
          {specs.map((spec, index) => (
            <div key={index} className="flex py-3 first:pt-0 last:pb-0">
              <div className="w-1/3 text-muted-foreground text-sm">
                {spec.label}
                {spec.labelFA && <span className="block text-xs">{spec.labelFA}</span>}
              </div>
              <div className="w-2/3 font-medium text-sm">{spec.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
