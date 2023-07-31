
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
const schema = z.object({
    firstName: z.string().min(2).max(10).nonempty(),
    lastName: z.string().min(2).max(10).nonempty(),
    email: z.string().email(),
    password: z.string().min(5).max(100),
    confirmPassword: z.string().min(5).max(100),
}).refine(data => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
})
const ReactHookForm = () => {


    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })
    console.log({ errors })
    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log("dsdsds", data)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">First Name: </label>
                <input type="text" {...register("firstName")} />
                {errors.firstName && <small className="text-red-400">{errors.firstName.message}</small>}
                <label htmlFor="">Last Name: </label>
                <input type="text" {...register("lastName")} />
                {errors.lastName && <small className='colo'>{errors.lastName.message}</small>}
                <label htmlFor="">Email: </label>
                <input type="email" {...register("email")} />
                {errors.email && <small className='colo'>{errors.email.message}</small>}
                <label htmlFor="">Password: </label>
                <input type="text" {...register("password")} />
                {errors.password && <small className='colo'>{errors.password.message}</small>}
                <label htmlFor="">Confirm Password: </label>
                <input type="text" {...register("confirmPassword")} />
                {errors.confirmPassword && <small className='colo'>{errors.confirmPassword.message}</small>}
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default ReactHookForm