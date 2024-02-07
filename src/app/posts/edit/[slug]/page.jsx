"use client";
import Editor from "@/components/editor/Editor";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Page = ({ params }) => {
  const { slug } = params;
  const router = useRouter();
  let [title, setTitle] = useState("");
  let [value, setValue] = useState("");
  const { data, mutate, isLoading } = useSWR(
    `${_PUBLIC_NEXTAUTH_URL}/api/posts/${slug}`,
    fetcher
  );
  const handleSubmit = async (updatedData) => {
    try {
      console.log(slug);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            desc: value,
            slug: slug,
          }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        console.log("Post successfully updated:", updatedPost);
        router.push(`/posts/${slug}`);
      } else {
        console.error(
          "Failed to update post:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  useEffect(() => {
    if (!title) {
      setTitle(data?.title);
      setValue(data?.desc);
    }
  }, [data]);
  return (
    <div>
      <Editor
        title={title}
        setTitle={setTitle}
        value={value}
        setValue={setValue}
        edit={true}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Page;
