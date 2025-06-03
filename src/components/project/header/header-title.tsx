import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

type HeaderTitleProps = {
  name: string;
  isSmallText?: boolean;
  button: boolean;
};

type Inputs = {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
};
const HeaderTitle = ({ name, isSmallText, button }: HeaderTitleProps) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [open, setOpen] = useState(false);
  const handleOnSubmit: SubmitHandler<Inputs> = async (data) => {
    toast("Success", { description: "Project created" });
    setOpen(false);
  };

  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText} ? 'text-lg' : 'text-2xl' text-xl font-bold dark:text-white`}
      >
        {name}
      </h1>
      {button && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="ml-full">
              <Plus size={20} /> New Board
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Make changes to input fields here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="New Project"
                    required
                    {...register("projectName")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" {...register("description")} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    required
                    placeholder="mm/dd/yyyy"
                    {...register("startDate")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    required
                    placeholder="mm/dd/yyyy"
                    {...register("endDate")}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export { HeaderTitle };
