"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const HERO_PLACEHOLDER_AVATAR = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
const HERO_FALLBACK_AVATAR = "/cvwi.jpeg";
const defaultHeroState = {
  avatar: HERO_PLACEHOLDER_AVATAR,
  fullName: "Iman Anooshehpour",
  shortDescription: "Software Developer, Instructor, Youtuber, and Tech Content Creator",
  longDescription:
    "Hello! I'm Iman (pronounced /i:man/), a name that embodies 'faith', a quality deeply rooted in my personal and professional life. My journey in tech is driven by a love for crafting seamless interfaces and delivering exceptional user experiences, bridging the gap between human-centered design and the technical prowess of Full-stack Engineering. Fascinated by the power of technology to transform ideas into tangible solutions, I thrive in blending aesthetics with functionality to create digital experiences that resonate with users. Let me know your software needs/ideas/problems; I'll take care of both Front-end and Back-end.",
};

const heroFormSchema = z.object({
  avatar: z.string().trim().min(1, "Avatar is required"),
  fullName: z.string().trim().min(2).max(200),
  shortDescription: z.string().trim().min(2).max(120),
  longDescription: z.string().trim().min(10),
});

export default function HeroEditorForm() {
  const [isFetching, setIsFetching] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(heroFormSchema),
    defaultValues: defaultHeroState,
  });

  const avatarValue = form.watch("avatar");
  const avatarPreview =
    avatarValue && avatarValue !== HERO_PLACEHOLDER_AVATAR ? avatarValue : HERO_FALLBACK_AVATAR;

  useEffect(() => {
    let isActive = true;

    const fetchHero = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("/api/hero");
        if (!response.ok) {
          throw new Error("Failed to load hero data");
        }
        const { data } = await response.json();
        if (isActive && data) {
          form.reset({
            avatar: data.avatar ?? HERO_PLACEHOLDER_AVATAR,
            fullName: data.fullName ?? defaultHeroState.fullName,
            shortDescription: data.shortDescription ?? defaultHeroState.shortDescription,
            longDescription: data.longDescription ?? defaultHeroState.longDescription,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not load current hero content. Using defaults.");
        form.reset(defaultHeroState);
      } finally {
        if (isActive) {
          setIsFetching(false);
        }
      }
    };

    fetchHero();

    return () => {
      isActive = false;
    };
  }, [form]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("avatar", values.avatar);
    formData.append("fullName", values.fullName);
    formData.append("shortDescription", values.shortDescription);
    formData.append("longDescription", values.longDescription);
    if (avatarFile) {
      formData.append("avatarFile", avatarFile);
    }

    try {
      const response = await fetch("/api/hero", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || "Failed to update hero section");
      }

      const { data } = await response.json();
      form.reset({
        avatar: data?.avatar ?? values.avatar,
        fullName: data?.fullName ?? values.fullName,
        shortDescription: data?.shortDescription ?? values.shortDescription,
        longDescription: data?.longDescription ?? values.longDescription,
      });
      setAvatarFile(null);
      toast.success("Hero section updated");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong while saving.");
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        form.setValue("avatar", reader.result, { shouldValidate: true, shouldDirty: true });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Update your avatar, headline, and intro copy.</CardDescription>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            <span>Loading hero data…</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex flex-col items-center gap-3 lg:w-1/3">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border bg-muted">
                    <Image
                      src={avatarPreview}
                      alt={form.watch("fullName") || "Hero avatar preview"}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={handleAvatarChange} />
                        </FormControl>
                        <FormDescription>Upload an image to convert into a data URL.</FormDescription>
                        <FormMessage />
                        <input type="hidden" {...field} />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormDescription>This appears above your hero description.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short description</FormLabel>
                        <FormControl>
                          <Input placeholder="120 characters max" maxLength={120} {...field} />
                        </FormControl>
                        <FormDescription>Concise headline about you.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Share more about yourself and your work..."
                        className="text-left"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Shown beneath your hero card on the homepage.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Saving…" : "Save hero"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
