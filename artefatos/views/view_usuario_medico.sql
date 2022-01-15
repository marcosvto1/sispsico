CREATE VIEW `view_usuario_medico` AS
SELECT 
 CAST( CONCAT(U.ID,M.ID) as UNSIGNED) as id,
 U.id as usuario_id,
 M.id as medico_id,
 A.id as agenda_id,
 U.nome,
 U.email,
 U.papel,
 U.admin,
 M.crm,
 M.especialidade,
 M.codigo
FROM USUARIO U
JOIN MEDICO M ON M.usuario_id = U.id
LEFT JOIN AGENDA A ON A.id = M.agenda_id
WHERE U.papel = 'P'