import v1Router from "../v1/index.js";

export default function checkVersion(){
    return (req, res, next) => {
        const version = req.headers["api-v"];
        if (version === "v1") {
            v1Router(req, res, next)
        } else {
            res.status(401).json({
                error: "API version missing or unsupported. Use api-v: v1"
            });
        }
    }
}