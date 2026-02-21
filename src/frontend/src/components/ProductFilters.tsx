import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/backend';

interface ProductFiltersProps {
  category: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const categoryLabels: Record<string, string> = {
  all: 'All Categories',
  [Category.viralReelsLibrary]: 'Viral Reels Library',
  [Category.editingSuite]: 'Editing Suite',
  [Category.masterclassCourses]: 'Masterclass Courses',
  [Category.softwareTools]: 'Software Tools',
};

export default function ProductFilters({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  return (
    <Card className="border-neonBlue-500/20 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg text-neonBlue-400">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="border-neonBlue-500/30">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value={Category.viralReelsLibrary}>Viral Reels Library</SelectItem>
              <SelectItem value={Category.editingSuite}>Editing Suite</SelectItem>
              <SelectItem value={Category.masterclassCourses}>Masterclass Courses</SelectItem>
              <SelectItem value={Category.softwareTools}>Software Tools</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Price Range</Label>
          <div className="space-y-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={10000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
