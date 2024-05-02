import { defineStore } from 'pinia';
import cache from '../utils/cache';
import { sigin, updateAccessUser, updateUser, logout, me } from '../api';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: cache.getItem('user'),
        accessToken: cache.getItem('token'),
        msg: {},
        role: 'Invitado',
        area: 'Colaborador',
        returnUrl: '',
        sessionUser: false,
        loadingUser: false
    }),
    getters: {
        hasRole: (state) => (roles) => {
            return state.user?.position && roles.includes(state.user.position);
        },
        getEsential(state) {
            return {
                name: state.user?.user?.name,
                position: state.user.position.name,
                area: state.user.position.areaId || ''
            };
        },
        token(state) {
            return state.accessToken?.access_token || 'Sin autorización';
        }
    },
    actions: {
        async login(payload) {
            try {
                const data = await sigin(payload);
                cache.setItem('token', data);
                this.accessToken = data;
                const user = await me();
                cache.setItem('user', user);
                this.user = user;
                this.sessionUser = true;
                this.role = user.role;
                console.log(user);
            } catch (error) {
                this.msg = error.message;
                this.user = null;
                this.sessionUser = false;
            }
        },
        async me() {
            const data = await me();
            console.log(data);
            cache.setItem('user', data);
            this.user = data;
            console.log(this.user);
        },
        async logout() {
            this.user = null;
            this.sessionUser = false;
            this.role = 'Invitado';
            await logout();
            cache.cleanAll();
        },
        async updateDataUser(payload) {
            try {
                const id = this.user.id;
                const data = await updateUser(id, payload);
                data.role = cache.getItem('user').role;
                cache.setItem('user', data);
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
