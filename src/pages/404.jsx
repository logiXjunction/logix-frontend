import { TriangleAlert } from "lucide-react";
import { Link} from "react-router-dom";

export default function NotFound(){

    return(
        <div className="min-h-screen flex items-center justify-center flex-col gap-y-5 bg-gradient-to-bl from-lxj-accent/50 to-lxj-alert/50">
            <div className="flex items-center">
            <h1 className="text-xl md:text-3xl font-bold">404 Not Found!</h1>
            <TriangleAlert className="w-10 h-10 md:w-12 md:h-12 text-red-700"/>
            </div>
            <Link to="/">
            <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-lxj-accent text-white transition-all duration-200 hover:shadow-lg hover:scale-105">
              Go to Home
            </button>
          </Link>

        </div>
    )
}
