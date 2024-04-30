import { defineStore } from 'pinia';
import cache from '../utils/cache';
import { sigin, currentUser, updateAccessUser, updateUser, logout, me } from '../api';

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
                console.log(payload);
                const data = await sigin(payload);
                console.log(data);
                cache.setItem('token', data);
                const user = await me();
                this.user = user;
                this.sessionUser = true;
                this.role = user.role;
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
        async logout(username) {
            this.user = null;
            this.sessionUser = false;
            this.position = 'Invitado';
            await logout({ username });
            cache.cleanAll();
        },
        async currentUser() {
            try {
                const { data } = await currentUser();
                const { email, phone } = data.user;
                this.user.user.email = email;
                this.user.user.phone = phone;
                this.sessionUser = true;
                this.position = this.user.position.name;
                this.area = this.user.position.areaId !== 1 && this.user.position.areaId !== 11 && this.user.position.areaId !== 4 && this.user.position.areaId !== 2 && this.user.position.areaId !== 6 ? 'Colaborador' : this.user.position.areaId;
            } catch (error) {
                this.user = null;
                this.sessionUser = false;
                this.position = 'Invitado';
            }
        },
        async updateAccessUser(payload) {
            try {
                const username = this.user.username;
                const { data } = await updateAccessUser(username, payload);
                return data.count;
            } catch (error) {
                console.log(error);
            }
        },
        async updateDataUser(payload) {
            try {
                const username = this.user.username;
                const { data } = await updateUser(username, payload);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
