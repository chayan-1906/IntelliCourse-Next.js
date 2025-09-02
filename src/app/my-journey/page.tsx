import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {routes} from "@/lib/routes";
import {AnimatedMyJourneyPage} from "@/components/AnimatedMyJourneyPage";
import {getBookmarkedCompanions, getUserCompanions, getUserSessions} from "@/lib/actions/companion.actions";

async function MyJourneyPage() {
	const user = await currentUser();

	if (!user) {
		redirect(routes.signInPath);
	}

	const [sessionHistory, companions, bookmarkedCompanions] = await Promise.all([
		getUserSessions(user.id),
		getUserCompanions(user.id),
		getBookmarkedCompanions(user.id),
	]);

	console.log('companions:', companions);

	const userData = {
		id: user.id,
		imageUrl: user.imageUrl,
		firstName: user.firstName,
		lastName: user.lastName,
		emailAddress: user.emailAddresses[0]?.emailAddress,
	};

	return (
		<AnimatedMyJourneyPage
			user={userData}
			sessionHistory={sessionHistory}
			companions={companions}
			bookmarkedCompanions={bookmarkedCompanions}
		/>
	);
}

export default MyJourneyPage;
