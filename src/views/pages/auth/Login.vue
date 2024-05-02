<script setup>
import { ref, reactive } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useAuthStore } from '../../../stores/auth';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const loading = ref(false);
const router = useRouter();
const toast = useToast();
const dataUser = reactive({
    dni: '',
    password: ''
});

const authStore = useAuthStore();
const login = async () => {
    // Verificar si el correo electrónico y la contraseña son campos requeridos
    loading.value = true;
    if (!dataUser.dni || !dataUser.password) {
        return toast.add({ severity: 'warn', summary: 'Por favor complete los campos requeridos', life: 3000 });
    }

    // Verificar si los campos contienen espacios en blanco
    if (/\s/.test(dataUser.dni) || /\s/.test(dataUser.password)) {
        return toast.add({ severity: 'warn', summary: 'Los campos no pueden contener espacios en blanco', life: 3000 });
    }
    // Verificar si la contraseña tiene al menos 6 caracteres
    if (dataUser.password.length < 6) {
        return toast.add({ severity: 'warn', summary: 'La contraseña debe tener al menos 6 caracteres', life: 3000 });
    }
    await authStore.login(dataUser);
    if (authStore.sessionUser) {
        // Mostrar el toast
        toast.add({ severity: 'success', summary: 'Validación Correcta Bienvenido', life: 3000 });

        setTimeout(() => router.push('/profile'), 2000);
    } else {
        console.log(authStore.msg);
        switch (authStore.msg) {
            case 'Unauthorized':
                toast.add({ severity: 'warn', summary: 'Usuario o contraseña incorrectos', life: 3000 });
                break;
            default:
                toast.add({ severity: 'error', summary: 'Ocurrió un error en el servidor intentelo más tarde.', life: 3000 });
                break;
        }
    }
    loading.value = false;
};

//const checked = ref(false);
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center mt-2">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <router-link to="/"><img src="/media/images/login/avatar.png" alt="Image" height="70" /></router-link>
                        <div class="text-900 text-2xl font-medium mt-2">Sistema Clínica Santa Rosa</div>
                        <span class="text-600 font-medium">Ingrese sus credenciales para continuar</span>
                    </div>

                    <div>
                        <label for="dni" class="block text-900 text-xl font-medium mb-2">DNI</label>
                        <InputText id="dni" type="text" placeholder="Ingrese su DNI" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="dataUser.dni" />

                        <label for="password" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password" v-model="dataUser.password" placeholder="Ingrese su contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :feedback="false"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <!-- <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recordarme</label>
                            </div> -->
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Olvidaste tu contraseña?</a>
                        </div>
                        <Toast />
                        <Button v-if="!loading" label="Iniciar Sesión" class="w-full p-3 text-xl" @click="login"></Button>
                        <div class="flex justify-content-center mt-3">
                            <ProgressSpinner v-show="loading" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
