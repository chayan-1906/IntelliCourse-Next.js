"use client";

import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const skeletonVariants = cva(
	"animate-pulse rounded-md bg-muted",
	{
		variants: {
			variant: {
				default: "bg-muted",
				text: "bg-muted/70 h-4",
				circular: "rounded-full bg-muted",
				rectangular: "rounded-md bg-muted",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Skeleton({className, variant, ...props}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
	return (
		<div data-slot="skeleton" className={cn(skeletonVariants({variant, className}))} {...props}/>
	);
}

export {Skeleton, skeletonVariants};
