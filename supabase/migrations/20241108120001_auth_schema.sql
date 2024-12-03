CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION auth.has_permission(user_id_ uuid, perm_ permission)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
RETURN (SELECT (EXISTS (SELECT users.user_id, users.email, users.role, users.permissions FROM users WHERE ((users.user_id = has_permission.user_id_) AND (has_permission.perm_ = ANY (users.permissions))))) AS "exists")
;

CREATE OR REPLACE FUNCTION auth.has_role(user_id_ uuid, role_ role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
RETURN (SELECT (EXISTS (SELECT users.user_id, users.email, users.role, users.permissions FROM users WHERE ((users.user_id = has_role.user_id_) AND (users.role = has_role.role_)))) AS "exists")
;


