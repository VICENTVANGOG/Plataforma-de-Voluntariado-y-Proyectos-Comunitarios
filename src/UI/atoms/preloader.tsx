    'use client'

    import { Scissors } from "lucide-react"
    import { useEffect, useState } from "react"

    export default function Preloader() {
        const [progress, setProgress] = useState(0)
        const [isVisible, setIsVisible] = useState(true)
        const [position, ] = useState({ left: 250, top: 0 })

        useEffect(() => {
            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer)
                        setTimeout(() => setIsVisible(false), 500)
                        return 100
                    }
                    return prev + 2
                })
            }, 50)

            return () => clearInterval(timer)
        }, [])

        if (!isVisible) return null

        return (
            <>
                <div 
                    className="fixed left-[200px] right-0 top-0 bottom-0 bg-primary z-50 flex items-center justify-center"
                    style={{
                        left: `${position.left}px`,
                        top: `${position.top}px`,
                        right: '0',
                        bottom: '0'
                    }}
                >
                    <div className="flex flex-col items-center gap-6 w-2/3">
                        <div className="relative">
                            <Scissors className="w-16 h-16 text-primary-foreground animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                            </div>
                        </div>
                        <div className="w-full h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary-foreground transition-all duration-300 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="text-primary-foreground font-medium">
                            loading {progress}%
                        </div>
                    </div>
                </div>
            </>
        )
    }