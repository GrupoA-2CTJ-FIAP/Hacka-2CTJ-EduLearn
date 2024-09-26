import Layout from "../components/layout";
import VideoContainer from "../components/videoContainer";

export default function Dashboard() {
    return (<Layout>
        <div style={{ padding: "auto",  backgroundColor: "lightgrey"  }}>
            <VideoContainer></VideoContainer>
        </div>
    </Layout>)
}