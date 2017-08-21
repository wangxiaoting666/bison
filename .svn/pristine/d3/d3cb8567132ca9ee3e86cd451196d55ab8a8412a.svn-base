package com.threegrand.controller.web;


import com.wonderland.sail.util.Tool;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Date;

/**
 * Created by lzg on 2016-01-14.
 */
@Controller
@RequestMapping("/imgs")
public class LoginOutController {


    @RequestMapping(method = RequestMethod.GET)
    public String loginOut() {

        return "test/img";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String cut(HttpServletResponse response,HttpServletRequest request,@RequestParam("x")String x,@RequestParam("y")String y,@RequestParam("w")String w,@RequestParam("h")String h,@RequestParam("imgPath")String imgPath) throws UnsupportedEncodingException, FileNotFoundException {
        request.setCharacterEncoding("utf-8");

        //图片的相对路径
        String imagPath=request.getParameter("imgPath");
        String relPath=request.getRealPath("/");//获取图片服务器绝对地址
        String newFileName=new Date().getTime()+".jpg";
        //实际图片路径
        String path1=relPath+imagPath;
        //裁剪后存储到服务器的图片路径
        String path2=relPath+"/img/"+newFileName;
        PrintWriter out = new PrintWriter(path2);
        int x1=Integer.parseInt(x);
        int y2=Integer.parseInt(y);
        int w3=Integer.parseInt(w);
        int h4=Integer.parseInt(h);
        try{
            Tool.CutImage(path1, path2, x1, y2, w3, h4);
        }catch(Exception e){
            e.printStackTrace();
            out.print("图片裁剪失败");
        }
        File file = new File(relPath+"img/");
        String[] str = file.list();
        request.getSession().setAttribute("file",str);

        return "test/img";
    }
//    @RequestMapping(method = RequestMethod.GET)
//    public String loginOut(){
//        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
//        webApplicationContext.getServletContext().removeAttribute("userId");
//        return "redirect:/login";
//    }
}
