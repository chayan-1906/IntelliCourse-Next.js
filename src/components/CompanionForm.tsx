'use client';

import {z} from "zod";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {routes} from "@/lib/routes";
import {subjects} from "@/constants";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {AnimationModal} from "@/components/AnimationModal";
import {useAnimationModal} from "@/hooks/useAnimationModal";
import {createCompanion} from "@/lib/actions/companion.actions";
import {CompanionFormSkeleton} from "@/components/skeletons/CompanionFormSkeleton";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const formSchema = z.object({
	name: z.string().min(1, {message: 'Companion is required'}),
	subject: z.string().min(1, {message: 'Subject is required'}),
	topic: z.string().min(1, {message: 'Topic is required'}),
	voice: z.string().min(1, {message: 'Voice is required'}),
	style: z.string().min(1, {message: 'Style is required'}),
	duration: z.coerce.number().min(1, {message: 'Duration is required'}),
});

function CompanionForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const {modalState, showLoading, showSuccess, close} = useAnimationModal();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			subject: '',
			topic: '',
			voice: '',
			style: '',
			duration: 15,
		},
	});

	useEffect(() => {
		setLoading(false);
	}, []);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		showLoading('Creating your companion...');

		const companion = await createCompanion(values);
		if (companion) {
			showSuccess('Companion created successfully!', 'Your AI companion is ready to help you learn!');
			setTimeout(() => router.push(routes.companionDetailsPath(companion.id)), 2000);
		} else {
			console.error('Failed to create a companion');
			close();
			router.push(routes.homePath);
		}
	}

	if (loading) {
		return <CompanionFormSkeleton/>;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-8'}>
				{/** name */}
				<FormField
					control={form.control}
					name={'name'}
					render={({field}) => (
						<FormItem>
							<FormLabel>Companion name</FormLabel>
							<FormControl>
								<Input placeholder={'Enter the companion name...'} className={'input'} {...field}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				{/** subject */}
				<FormField
					control={form.control}
					name={'subject'}
					render={({field}) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
									<SelectTrigger className={'input cursor-pointer capitalize'}>
										<SelectValue placeholder={'Select the subject'}/>
									</SelectTrigger>
									<SelectContent>
										{subjects.map((subject: string) => (
											<SelectItem key={subject} value={subject} className={'input capitalize cursor-pointer'}>{subject}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				{/** topic */}
				<FormField
					control={form.control}
					name={'topic'}
					render={({field}) => (
						<FormItem>
							<FormLabel>What should the companion help with?</FormLabel>
							<FormControl>
								<Textarea placeholder={'Ex. Derivatives and Integrals...'} className={'input'} {...field}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				{/** voice */}
				<FormField
					control={form.control}
					name={'voice'}
					render={({field}) => (
						<FormItem>
							<FormLabel>Voice</FormLabel>
							<FormControl>
								<Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
									<SelectTrigger className={'input cursor-pointer'}>
										<SelectValue placeholder={'Select the voice'}/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={'male'} className={'input cursor-pointer'}>Male</SelectItem>
										<SelectItem value={'female'} className={'input cursor-pointer'}>Female</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				{/** style */}
				<FormField
					control={form.control}
					name={'style'}
					render={({field}) => (
						<FormItem>
							<FormLabel>Style</FormLabel>
							<FormControl>
								<Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>
									<SelectTrigger className={'input cursor-pointer'}>
										<SelectValue placeholder={'Select the style'}/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={'formal'} className={'input cursor-pointer'}>Formal</SelectItem>
										<SelectItem value={'casual'} className={'input cursor-pointer'}>Casual</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>

				{/** duration */}
				<FormField
					control={form.control}
					name={'duration'}
					render={({field}) => (
						<FormItem>
							<FormLabel>Estimated session duration</FormLabel>
							<FormControl>
								<Input type={'number'} placeholder={'15'} className={'input'} {...field}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Button type={'submit'} className={'w-full cursor-pointer'}>Build Your Companion</Button>
			</form>

			<AnimationModal
				isOpen={modalState.isOpen}
				type={modalState.type}
				title={modalState.title}
				message={modalState.message}
				onClose={close}
				autoClose={modalState.type === 'success'}
			/>
		</Form>
	);
}

export {CompanionForm};
