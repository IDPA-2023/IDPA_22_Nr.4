<div class="flex flex-col items-center h-hull w-full">
	<div class="card w-full max-w-fit bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
				Loggen Sie sich ein
			</h2>
			<p class="text-center mt-1">
				Oder <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
					>registriren sie sich</a
				>, wenn Sie noch keinen Account haben.
			</p>
			<form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
				<div class="form-control w-full max-w-md">
					<label for="email" class="label font-medium pb-1">
						<span class="label-text">Email</span>
					</label>
					<input type="email" name="email" class="input input-bordered w-full max-w-md" />
				</div>
				<div class="form-control w-full max-w-md">
					<label for="password" class="label font-medium pb-1">
						<span class="label-text">Passwort</span>
					</label>
					<input type="password" name="password" class="input input-bordered w-full max-w-md" />
				</div>
				<div class="w-full max-w-md pt-2">
					<button type="submit" class="btn btn-primary w-full">Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
