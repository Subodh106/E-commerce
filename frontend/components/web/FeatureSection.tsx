import { Clock, Headphones, Lock, Truck } from "lucide-react"


const FeatureSection = () => {
  return (
    <section  className="flex justify-between items-center gap-3 w-full bg-slate-100 p-4 rounded-lg">
        <div className="flex justify-center items-center gap-2">
            <Truck/>
            <div className="flex justify-center items-center flex-col gap-1">
                <span className="text-lg">
                    Free Shipping
                </span>
                <span className="text-xs text-slate-700">
                    On orders over $50
                </span>
            </div>
        </div>
        <div className="flex justify-center items-center gap-2"> 
            <Clock/>
            <div className="flex justify-center items-center flex-col ">
            <span className="text-lg">
                Easy Returns
            </span>
            <span className="text-xs text-slate-700">
                30-day return policy
            </span>
            </div>
        </div>
        <div className="flex justify-center items-center gap-2">
            <Lock/>
            <div className="flex justify-center flex-col items-center" >
            <span className="text-lg">
                Secure Payment
            </span>
            <span className="text-xs text-slate-700">
                100% secure checkout
            </span>
            </div>
        </div>
        <div className="flex justify-center items-center gap-2">
            <Headphones/>
            <div className="flex justify-center items-center flex-col">
            <span className="text-lg">
                24/7 Support
            </span>
            <span className="text-xs text-slate-700">
                Dedicated support
            </span>
            </div>
        </div>
    </section>
  )
}

export default FeatureSection