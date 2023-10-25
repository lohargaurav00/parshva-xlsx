import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import InputForm from "./Form"

export function Modal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Docket</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70%] max-h-[95vh] overflow-auto">
                <DialogHeader className="justify-center w-full sm:text-center">
                    <DialogTitle>Add Docket</DialogTitle>
                </DialogHeader>
                <InputForm />
            </DialogContent>
        </Dialog>
    )
}
