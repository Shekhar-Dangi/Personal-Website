import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const PUT = async (req, { params, body }) => {
  const session = await getAuthSession();
  console.log(session.user.email);
  console.log(process.env.AUTH_EMAIL);
  if (!session || session.user.email !== process.env.AUTH_EMAIL) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }
  const updatedData = await req.json();
  console.log(">>>>>", updatedData.slug);
  try {
    const updatedPost = await prisma.post.update({
      where: { slug: updatedData.slug },
      data: {
        title: updatedData.title,
        desc: updatedData.desc,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update post!" }, { status: 500 })
    );
  }
};
