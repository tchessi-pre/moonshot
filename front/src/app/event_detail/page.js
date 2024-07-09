import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Events() {
    return (
        <div className="flex  items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-max sm:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row p:5">
                <div className=" shrink p-5 w-max sm:w-2/5">
                    <svg height="auto" width="100%" className="block">
                        <rect width="100%" height="100%" fill="grey" />
                    </svg>
                </div>
                <Card className="flex-1 sm:w-3/5 p-5">
                    <CardHeader className="p-6 bg-gray-50">
                        <CardTitle className="text-xl font-semibold mb-2 text-grey-700">Tango</CardTitle>
                        <div className="flex justify-between">
                            <CardDescription className="text-yellow-800">Musique Argentine</CardDescription>
                            <CardDescription className="text-yellow-800">Le 16/07/2024</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 max-h-60 overflow-y-scroll">
                        <p className="text-gray-700">
                            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantiumtotam rem aperiam, eaque ipsa quae ab illo inventore 
                            veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                            "Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
                        </p>
                    </CardContent>
                    <CardFooter className="px-6 py-4 bg-gray-50">
                        <Button>S'inscrire</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
