import prismaClient from "@/lib/prisma";



export default async function Home() {
  const users = await prismaClient.uSER.findMany();
  const content = await prismaClient.dATA.findMany();
  console.log("content", content);
  console.log(users);
  return (
    <div>
      hii Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente error explicabo optio beatae nostrum unde, quas est labore! Nam aut maiores itaque aspernatur eum, impedit quod id laborum officiis facere tempora? Odio omnis itaque, incidunt veritatis, nemo deleniti quae excepturi ducimus consequuntur sapiente sint ipsam praesentium qui veniam modi iste error maiores minima saepe! Doloribus molestias distinctio quis natus enim ex, minima aperiam blanditiis nulla. Cupiditate animi ducimus vero tenetur, doloremque possimus molestias ipsum deleniti rem nostrum? Non harum laborum deserunt dolorem consectetur corporis optio deleniti eius odit obcaecati iusto perspiciatis rem ullam eum ipsum molestiae, officiis veritatis, quos nemo?
    </div>
  );
}
