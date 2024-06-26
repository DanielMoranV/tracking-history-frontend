<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useToast } from 'primevue/usetoast';
import cache from '../../utils/cache';

const toast = useToast();
const authStore = useAuthStore();

const loading = ref(false);
const loadingProfile = ref(false);
const password = ref('');
const password1 = ref('');
const dataUser = reactive({
    documentType: '',
    dni: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    id: ''
});
const showMessage = (severity, summary) => {
    loading.value = false;
    toast.add({ severity, summary, life: 3000 });
};
const updatePassword = async () => {
    loading.value = true;

    if (!password.value || !password1.value) {
        showMessage('warn', 'Por favor complete los campos requeridos');
    } else if (password.value != password1.value) {
        showMessage('warn', 'Las contraseñas no coinciden');
    } else if (/\s/.test(password.value)) {
        showMessage('warn', 'Los campos no pueden contener espacios en blanco');
    } else if (password.value.length < 6) {
        showMessage('warn', 'La contraseña debe tener al menos 6 caracteres');
    } else {
        const payload = { password: password.value, id: dataUser.id };
        await authStore.updateDataUser(payload);
        toast.add({ severity: 'success', summary: 'Contraseña actualizada', life: 4000 });
        password.value = '';
        password1.value = '';
    }

    loading.value = false;
};
const updateDataUser = async () => {
    loadingProfile.value = true;
    const payload = {
        email: dataUser.email,
        phone: dataUser.phone,
        id: dataUser.id
    };
    console.log(payload);
    await authStore.updateDataUser(payload);
    showMessage('success', 'Información de perfil actualizada correctamente');
    password.value = '';
    password1.value = '';

    loadingProfile.value = false;
};

onMounted(async () => {
    const userData = cache.getItem('user');
    Object.assign(dataUser, userData);
});
</script>
<template>
    <div className="card card-w-title">
        <h5>Información Personal</h5>
        <p>Su contraseña por defecto será su DNI, cambiela regularmente para mayor seguridad</p>
    </div>
    <div className="grid">
        <div class="col-12 md:col-6">
            <div class="card p-fluid">
                <h5>Perfil</h5>
                <div class="field">
                    <label for="dni">{{ dataUser.documentType.toUpperCase() }}</label>
                    <InputText id="dni" type="text" :disabled="true" :v-model="dataUser.dni" :modelValue="dataUser.dni" />
                </div>
                <div class="field">
                    <label for="name">Nombre</label>
                    <InputText id="name" type="text" :disabled="true" :v-model="dataUser.name" :modelValue="dataUser.name" />
                </div>
                <div class="field">
                    <label for="email">Email</label>
                    <InputText id="email" type="text" v-model="dataUser.email" :modelValue="dataUser.email" />
                </div>
                <div class="field">
                    <label for="phone">Teléfono</label>
                    <InputText id="phone" type="text" v-model="dataUser.phone" :modelValue="dataUser.phone" />
                </div>

                <Button v-if="!loadingProfile" label="Modificar" icon="pi pi-user" class="p-button-success col-12 md:col-3 mr-2 mb-2" :loading="loadingProfile" @click="updateDataUser"></Button>
                <div class="flex justify-content-center mt-3">
                    <ProgressSpinner v-show="loadingProfile" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </div>
            </div>
        </div>
        <div class="col-12 md:col-6">
            <div class="card p-fluid">
                <h5>Modificar Contraseña</h5>
                <span class="p-float-label mt-6">
                    <Password id="password" type="password" :toggleMask="true" v-model="password" />
                    <label for="password">Contraseña</label>
                </span>
                <span class="p-float-label mt-5">
                    <Password id="password1" type="password" :toggleMask="true" v-model="password1" />
                    <label for="password1">Confirmar Contraseña</label>
                </span>
                <Toast />
                <Button v-if="!loading" label="Modificar" icon="pi pi-unlock" class="p-button-success col-12 md:col-3 mr-2 mb-2 mt-5" :loading="loading" @click="updatePassword"></Button>
                <div class="flex justify-content-center mt-3">
                    <ProgressSpinner v-show="loading" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>
