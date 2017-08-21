package com.threegrand.bison.log;

import com.threegrand.bison.log.model.Log;
import com.threegrand.bison.log.service.impl.OptionLogServiceImpl;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import java.lang.reflect.Method;

/**
 * Created by lzg on 2016-01-13.
 */
@Aspect
public class LogAspect {

    @Autowired
    private OptionLogServiceImpl logBO;


    /**
     * 添加业务逻辑方法切入点
     */
    @Pointcut("execution(* com.threegrand.bison.*.service.impl.*.add*(..))")
    public void insertCell(){
        System.out.println("**************The System is Searching Information For You****************");
    }

    /**
     * 修改业务逻辑方法切入点
     */
    @Pointcut("execution(* com.threegrand.bison..service.impl.*.update*(..))")
    public void updateCell(){
        System.out.println("------切入update-----");
    }

    /**
     * 删除业务逻辑方法切入点
     */
    @Pointcut("execution(* com.threegrand.bison..service.impl.*.delete*(..))")
    public void deleteCell(){
        System.out.println("------切入deleted-----");
    }

    @Before("execution(* com.threegrand.bison.*.service.impl.*.add*(..)) || execution(* com.threegrand.bison..service.impl.*.update*(..)) || execution(* com.threegrand.bison..service.impl.*.delete*(..))")
    public void getRequest(){

    }

    /**
     * 添加操作日志(后置通知)
     * @param joinPoint
     * @param rtv
     */
    @SuppressWarnings("unused")
    @AfterReturning(value="insertCell()",argNames="rtv", returning="rtv")
    public void insertLog(JoinPoint joinPoint, Object rtv) throws Throwable{
        String userId = getUserId();
        if(userId == null){//没有管理员登录
            return ;
        }
        //判断参数
        if(joinPoint.getArgs() == null){//没有参数
            return ;
        }
        //获取方法名
        String methodName = joinPoint.getSignature().getName();
        //获取操作内容
        String opContent = optionContent(joinPoint.getArgs(),methodName);

        Log log = new Log();
        log.setUserId(Long.parseLong(userId));
        log.setContent(opContent);
        log.setOperation("添加");
        logBO.insertLog(log);
    }

    /**
     * 管理员修改操作日志(后置通知)
     * @param joinPoint
     * @param rtv
     * @throws Throwable
     */
    @SuppressWarnings("unused")
    @AfterReturning(value="updateCell()", argNames="rtv", returning="rtv")
    public void updateLog(JoinPoint joinPoint, Object rtv) throws Throwable{
        String userId = getUserId();
        if(userId == null){//没有登录
            return;
        }
        //判断参数
        if(joinPoint.getArgs() == null){//没有参数
            return;
        }
        //获取方法名
        String methodName = joinPoint.getSignature().getName();
        //获取操作内容
        String opContent = optionContent(joinPoint.getArgs(), methodName);

        //创建日志对象
        Log log = new Log();
        log.setUserId(Long.parseLong(userId));
        log.setContent(opContent);
        log.setOperation("修改");//操作
        logBO.insertLog(log);
    }

    /**
     * 删除操作
     * @param joinPoint
     * @param rtv
     */
    @SuppressWarnings("unused")
    @AfterReturning(value="deleteCell()",argNames="rtv", returning="rtv")
    public void deleteLog(JoinPoint joinPoint, Object rtv) throws Throwable{
        String userId = getUserId();
        if(userId == null){//没有登录
            return;
        }
        //判断参数
        if(joinPoint.getArgs() == null){//没有参数
            return;
        }
        //获取方法名
        String methodName = joinPoint.getSignature().getName();

        StringBuffer rs = new StringBuffer();
        rs.append(methodName);
        String className = null;
        for(Object info : joinPoint.getArgs()){
            //获取对象类型
            className = info.getClass().getName();
            className = className.substring(className.lastIndexOf(".") + 1);
            rs.append("[参数1，类型:" + className + "，值:(id:" + joinPoint.getArgs()[0]+")");
        }

        //创建日志对象
        Log log = new Log();
        log.setUserId(Long.parseLong(userId));
        log.setContent(rs.toString());
        log.setOperation("删除");//操作
        logBO.insertLog(log);
    }

    /**
     * 使用Java反射来获取被拦截方法(insert、update)的参数值，
     * 将参数值拼接为操作内容
     * @param args
     * @param mName
     * @return
     */
    public String optionContent(Object[] args, String mName){
        if(args == null){
            return null;
        }
        StringBuffer rs = new StringBuffer();
        rs.append(mName);
        String className = null;
        int index = 1;
        //遍历参数对象
        for(Object info : args){
            //获取对象类型
            className = info.getClass().getName();
            className = className.substring(className.lastIndexOf(".") + 1);
            rs.append("[参数"+index+"，类型:" + className + "，值:");
            //获取对象的所有方法
            Method[] methods = info.getClass().getDeclaredMethods();
            // 遍历方法，判断get方法
            for(Method method : methods){
                String methodName = method.getName();
                // 判断是不是get方法
                if(methodName.indexOf("get") == -1){//不是get方法
                    continue;//不处理
                }
                Object rsValue = null;
                try{
                    // 调用get方法，获取返回值
                    rsValue = method.invoke(info);
                }catch (Exception e) {
                    continue;
                }
                //将值加入内容中
                rs.append("(" + methodName+ ":" + rsValue + ")");
            }
            rs.append("]");
            index ++;
        }
        return rs.toString();
    }

    private String  getUserId(){
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        String userId =(String)webApplicationContext.getServletContext().getAttribute("userId");
        return userId;
    }
}
