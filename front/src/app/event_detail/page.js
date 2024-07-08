import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function EventDetail() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="p-6 bg-gray-50">
                    <CardTitle className="text-xl font-semibold mb-2 text-gray-900">Card Title</CardTitle>
                    <CardDescription className="text-gray-600">Card Description</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-gray-700">Card Content</p>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-500">Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}
