import { useData } from "../Checker";

export const Home = () => {
  const { data } = useData();
  return (
    <div>{data?.firstname}</div>
  )
}
