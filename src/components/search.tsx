import { Input } from "./ui/input"

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="lg:w-[300px]"
      />
    </div>
  )
}
