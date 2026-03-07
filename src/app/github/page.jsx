import GitHub from '../../components/GitHub';
import Header from '../../components/Header';

export const metadata = {
    title: 'GitHub Stats | Vikas Gulia',
    description: 'Live GitHub stats and repository showcase',
};

export default function GitHubPage() {
    return (
        <>
            <Header />
            <GitHub />
        </>
    );
}
