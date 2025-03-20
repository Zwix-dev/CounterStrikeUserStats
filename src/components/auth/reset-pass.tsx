import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ResetPass() {
    return (
        <Card className="mx-auto w-96">
            <form action="">
                <CardHeader>
                    <CardTitle className="text-xl dark:text-white my-4"> Rénitialisez votre mot-de-passe </CardTitle>
                    
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Votre e-mail</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full ">
                        Valider
                    </Button>
                    </div>

                   
                    
                </CardContent>


            </form>
        </Card>
    )

}