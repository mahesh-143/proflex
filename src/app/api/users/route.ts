import prisma from "@/app/libs/prismadb"

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany()
  return { props: { users } }
}
