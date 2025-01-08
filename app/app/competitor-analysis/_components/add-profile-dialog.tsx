"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCompetitorSchema } from "@/schemas/competitors.schema";
import { useAction } from "next-safe-action/hooks";
import { createCompetitorAction } from "@/server/competitor-analysis";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AddProfileDialog() {
  const [open, setOpen] = useState(false);
  const { execute, isPending } = useAction(createCompetitorAction);
  const router = useRouter();

  const form = useForm<z.infer<typeof createCompetitorSchema>>({
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof createCompetitorSchema>) => {
    try {
      execute(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      if (!isPending) {
        form.reset();
        setOpen(false);
        router.refresh();
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-sm">
          Add Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Profile</DialogTitle>
          <DialogDescription>
            Enter competitor's LinkedIn URL.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <div className="grid items-center gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-3"
                        placeholder="https://www.linkedin.com/in/....."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Add Profile"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
