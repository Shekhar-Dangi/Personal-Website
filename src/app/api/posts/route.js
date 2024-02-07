import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");
  const editorChoice = searchParams.get("editorChoice") || "false";
  const featured = searchParams.get("featured") || "false";

  const POST_PER_PAGE = 2;

  let whereClause = {};

  if (featured && featured === "true") {
    whereClause.featured = true;
  } else if (editorChoice && editorChoice === "true") {
    whereClause.editorChoice = true;
  }
  console.log(editorChoice);
  if (cat && cat !== "") {
    whereClause.catSlug = cat;
  }
  const query = {
    take: whereClause.editorChoice ? undefined : POST_PER_PAGE,
    skip: whereClause.editorChoice ? undefined : POST_PER_PAGE * (page - 1),
    where: whereClause,
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
